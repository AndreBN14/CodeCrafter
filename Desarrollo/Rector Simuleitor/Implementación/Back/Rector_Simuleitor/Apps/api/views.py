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
        personajes = ["profesora","estudiante","periodista","decano","centro federado","profesor","evento favorable (aumento en reputacion por descubrimiento cientifico, buena gestión o mejora en infraestructura)"]
        personaje_ramdom=random.choice(personajes)
        return personaje_ramdom    

    def post(self, request):

        evento_nemesis = random.random()

        user_input = request.data

        dinero = user_input.get("dinero") #esto me da el dinero actual
        aprobacion = user_input.get("aprobacion") #aprobacion actual
        #AGREGEN A OTRA JIRE ROMÁN JAJAJAJ EN LOS PERSONAJES Y LAS CARTAS
        contexto_general = """Eres un generador de eventos para el juego Rector Simulator, el cual
                            consiste en que el jugador intente mantenerse en el cargo de rector de la Universidad Nacional Mayor de San Marcos durante
                            el mayor tiempo posible y tu te encargas de generar escenarios aleatorios tanto positivos como negativos 
                            que afecten su permanencia donde los recursos son dinero y aprobacion.
                            """
        contexto_nemesis = """Considera ademas que el rector tiene un némesis llamado Jire Román, el cual
                                nos tiene rencor porque le ganamos las elecciones universitarias para erginos 
                                como rectores pues mediante una investigación demostramos que su partido
                                era corrupto y por ello el al ser su cabecilla tuvo que separse de la universidad
                                pero todavia anhela el poder por lo que mediante sus operadores politicos tanto dentro como fuera
                                de la universidad busca deshacreditarnos, para quitarnos del cargo.
                            """
        if evento_nemesis <= 0.2: 

            prompt = f"""
            {contexto_general}
            {contexto_nemesis}
            Genera un evento aleatorio utilizando la siguiente estructura JSON: 

            {{
                "evento": "Descripción corta del evento pero que mantenga detalles.",
                "personaje": "Jire Román" | "Secuases",
                "decision1": {{
                    "decision": "Descripción de la primera decision basada en el evento.",
                    "consecuencia": {{
                        "recurso": "aprobacion" | "dinero",
                        "accion": Número entre -2 y -20
                    }}
                }},
                "decision2": {{
                    "decision": "Descripción de la segunda decision basada en el evento.",
                    "consecuencia": {{
                        "recurso": "aprobacion" | "dinero",
                        "accion": Número entre -2 y -20
                    }}
                }}
            }}

            Los recursos actuales son:
            - Dinero: ${dinero}
            - Aprobacion: ${aprobacion}

            Genera eventos que consideren este estado, sabiendo que el maximo en ambos es 100. 
            Asegúrate de que el JSON sea válido y no agregues texto adicional.
            """
        
        else:
            pj=self.ramdomizador()
            
            prompt = f"""
            {contexto_general}
            Genera un evento aleatorio en la siguiente estructura JSON:

            {{
                "evento": "Descripción corta del evento.",
                "personaje": {pj},
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

            if evento_nemesis <= 0.2:
                completion = client.chat.completions.create(
                model="gpt-4o-mini",  # O el modelo que estés usando
                messages= [{"role": "system", "content": prompt}],
                max_tokens=250,
                temperature=1.9,
            )
            else:
                completion = client.chat.completions.create(
                model="gpt-4o-mini",  # O el modelo que estés usando
                messages= [{"role": "system", "content": prompt}],
                max_tokens=150,
                temperature=1.1,
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


# prompt antiguo 
"""
                    Eres un generador de eventos para el juego Rector Simulator. 
                    Genera un evento aleatorio en la siguiente estructura JSON:

                    {{
                        "evento": "Descripción corta del evento.",
                        "personaje": "profesora" | "estudiante" | "periodista" | "decano",
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
