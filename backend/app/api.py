# api.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/api/data")
def get_data():
    return {"message": "Data from FastAPIYahoo!!!"}

@router.get("/api/levitating")
def get_data2():
    return {"message": "Data from FastAPIYaho3434"}
