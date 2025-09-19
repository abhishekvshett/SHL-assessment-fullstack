from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from model import get_recommendations
# import uvicorn
# import os

app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def home():
    return {"message": "SHL Assessment Recommendation System is running!"}

@app.get("/recommend/")
def recommend(job_query: str, top_k: int = 3):
    recommendations = get_recommendations(job_query, top_k)
    return {"job_query": job_query, "recommendations": recommendations}