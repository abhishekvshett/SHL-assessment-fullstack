import pandas as pd
from sentence_transformers import SentenceTransformer, util


model = SentenceTransformer('all-MiniLM-L6-v2')

df = pd.read_csv("data/shl_assessments.csv")


test_embeddings = model.encode(df['name'].tolist(), convert_to_tensor=True)

def get_recommendations(job_query: str, top_k: int = 3):
    job_embedding = model.encode(job_query, convert_to_tensor=True)
    similarities = util.pytorch_cos_sim(job_embedding, test_embeddings)[0]
    top_results = similarities.topk(k=top_k)

    recommended = []
    for score, idx in zip(top_results.values, top_results.indices):
        row = df.iloc[int(idx)]
        recommended.append({
            "name": row['name'],
            "url": row['url'],
            "similarity_score": round(float(score), 4)
        })
    return recommended