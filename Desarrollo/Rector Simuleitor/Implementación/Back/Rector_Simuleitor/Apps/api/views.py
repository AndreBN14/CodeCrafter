from openai import OpenAI, OpenAIError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from json import loads, JSONDecodeError
import random
import logging

logger = logging.getLogger(__name__)
client = OpenAI()

class ChatGPTAPIView(APIView):

    def ramdomizador(self):
        personajes = ["profesora","estudiante","periodista","decano","centro federado","profesor","el personaje se llama "'buenas noticias'" y puede ser por ejemplo aumento en reputacion por descubrimiento cientifico, buena gestión, mejora en infraestructura, etc"]
        personaje_ramdom=random.choice(personajes)
        return personaje_ramdom    

    def post(self, request):

        evento_nemesis = random.random()

        user_input = request.data

        dinero = user_input.get("dinero")
        aprobacion = user_input.get("aprobacion")

        contexto_general = """Eres un generador de eventos para el juego Rector Simulator, el cual
                            consiste en que el jugador intente mantenerse en el cargo de rector de la Universidad Nacional Mayor de San Marcos durante
                            el mayor tiempo posible y tu te encargas de generar escenarios aleatorios tanto positivos como negativos 
                            que afecten su permanencia donde los recursos son dinero y aprobacion. En el juego utilizamos personajes que 
                            son los protegonistas de los eventos, cuando los generes considera el personaje y crea un evento que lo involucre.
                            """
        
        contexto_nemesis = """Considera ademas que el rector tiene un némesis llamado Jire Román, el cual
                                me tiene rencor porque le ganamos las elecciones universitarias para ergime 
                                como rector pues mediante una investigación demostramos con mi equipo que su partido
                                era corrupto y por ello el al ser su cabecilla tuvo que separse de la universidad
                                pero todavia anhela el poder por lo que mediante sus operadores politicos tanto dentro como fuera
                                de la universidad busca deshacreditarnos, para que me hechen del cargo.
                                No olvides que no tiene ningun reparo en mentir, puede crear acusaciones de cualquier tipo o contratar personas para afectar la infraestructura de la universidad.
                            """

        regla = "Asegúrate de que el JSON sea perfectamente válido. No agregues texto adicional ni comentarios, tampoco envies ningun markdown, duelve el json como si fuera texto plano."

        if evento_nemesis <= 0.15: 

            prompt = f"""
            {contexto_general}
            {contexto_nemesis}
            Tu respuesta debe seguir la estructura JSON indicada abajo, no agregues markdows a tu respuesta, solo necesito el JSON: 
            {regla}
            {{
                "evento": "Descripción corta del evento pero que mantenga detalles. cuando hables del rector usa segunda persona considerando al jugador como el rector",
                "personaje": "jire román" | "secuases",
                "decision1": {{
                    "decision": "Descripción de la primera decision basada en el evento.",
                    "consecuencia": {{
                        "recurso": "aprobacion" | "dinero",
                        "accion": "Número entre -5 y -20"
                    }}
                }},
                "decision2": {{
                    "decision": "Descripción de la segunda decision basada en el evento.",
                    "consecuencia": {{
                        "recurso": "aprobacion" | "dinero",
                        "accion": "Número entre -5 y -20"
                    }}
                }}
            }}
            """

        else:
            pj=self.ramdomizador()
            
            prompt = f"""
            {contexto_general}
            Tu respuesta debe seguir la estructura JSON indicada abajo, no agregues markdows a tu respuesta, solo necesito el JSON:

            {{
                "evento": "Descripción corta del evento.",
                "personaje": {pj},
                "decision1": {{
                    "decision": "Descripción de la primera decision basada en el evento. cuando hables del rector usa segunda persona",
                    "consecuencia": {{
                        "recurso": "aprobacion" | "dinero",
                        "accion": "Número entre -20 y 20"
                    }}
                }},
                "decision2": {{
                    "decision": "Descripción de la segunda decision basada en el evento.",
                    "consecuencia": {{
                        "recurso": "aprobacion" | "dinero",
                        "accion": "Número entre -20 y 20"
                    }}
                }}
            }}

            Los recursos actuales son:
        - Dinero: ${dinero}
        - Aprobacion: ${aprobacion}

        Genera eventos que consideren este estado, sabiendo que el maximo en ambos es 100. 
            """

        try:

            if evento_nemesis <= 0.2:
                completion = client.chat.completions.create(
                model="gpt-4o-mini",  # O el modelo que estés usando
                messages= [{"role": "system", "content": prompt}],
                max_tokens=500,
                temperature=1,
            )
            else:
                completion = client.chat.completions.create(
                model="gpt-4o-mini",  # O el modelo que estés usando
                messages= [{"role": "system", "content": prompt}],
                max_tokens=500,
                temperature=1,
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