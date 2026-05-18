import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'super-secret-mts-hackathon-key')
    
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///mts_local.sqlite3')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    PROXYAPI_KEY = os.getenv("PROXYAPI_KEY")
    API_URL = "https://api.proxyapi.ru/openrouter/v1/chat/completions"
    MODEL = "meta-llama/llama-3.3-70b-instruct"