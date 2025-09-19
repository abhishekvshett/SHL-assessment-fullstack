import pandas as pd

def load_assessments():
    """Loads SHL assessments from the CSV file."""
    return pd.read_csv("data/shl_assessments.csv")