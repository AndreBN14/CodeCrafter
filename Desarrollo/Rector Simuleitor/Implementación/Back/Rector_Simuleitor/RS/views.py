from openai import OpenAI, OpenAIError
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from json import loads, JSONDecodeError

client = OpenAI(api_key="Tu apikey")

class ChatGPTAPIView(APIView):
    def post(self, request):
        user_input = request.data

        dinero = user_input.get("dinero")
        aprobacion = user_input.get("aprobacion")

        prompt = f"""
        Eres un generador de eventos para el juego Rector Simulator. 
        Genera un evento aleatorio en la siguiente estructura JSON:

        {{
            "evento": "Descripción corta del evento.",
            "personaje": "profesora" | "estudiante" | "periodista" | "secretaria",
            "decision1": {{
                "decision": "Descripción de la primera decision basada en el evento.",
                "consecuencia": {{
                    "recurso": "aprobacion" | "dinero",
                    "accion": Número entre -20 y 20
                }}
            }},
            "decision2": {{
                "decision": "Descripción de la segunda decision basada en el evento.",
                "consecuencia": {{
                    "recurso": "aprobacion" | "dinero",
                    "accion": Número entre -20 y 20
                }}
            }}
        }}

        Los recursos actuales son:
        - Dinero: ${dinero}
        - Aprobacion: ${aprobacion}

        Genera eventos que consideren este estado, sabiendo que el maximo en ambos es 100. 
        Asegúrate de que el JSON sea válido y no agregues texto adicional.
        """

        try:
            # Hacer la solicitud a OpenAI usando el formato del cliente oficial
            completion = client.chat.completions.create(
                model="gpt-4o-mini",  # O el modelo que estés usando
                messages= [{"role": "system", "content": prompt}],
                max_tokens=150,
                temperature=0.7,
            )
            
            # Obtener la respuesta del modelo
            chatgpt_response = completion.choices[0].message.content

            event_data = loads(chatgpt_response)

            return Response(event_data, status=status.HTTP_200_OK)
        
        except JSONDecodeError as ve:
            # Manejar errores de validación
            return Response({"error": ve.errors()}, status=status.HTTP_400_BAD_REQUEST)
        
        except OpenAIError as oe:
            # Manejar errores de OpenAI
            return Response({"error": oe.message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        except Exception as e:
            # Manejar cualquier otro error
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

