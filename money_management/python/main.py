from fastapi import FastAPI
from pydantic import BaseModel
import os

app = FastAPI()

class Money(BaseModel):
    amount: int
    mode: str

DATA_FILE = "money.txt"

def load_money():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r") as f:
            return int(f.read())
    return 0

def save_money(amount):
    with open(DATA_FILE, "w") as f:
        f.write(str(amount))

def add_money(amount):
    current_money = load_money()
    current_money += amount
    save_money(current_money)
    return current_money

def subtract_money(amount):
    current_money = load_money()
    current_money -= amount
    save_money(current_money)
    return current_money

@app.get("/money")
def get_money():
    amount = load_money()
    return {"amount": amount}

@app.post("/money")
def update_money(money: Money):
    if money.mode == "add":
        current_money = add_money(money.amount)
    elif money.mode == "subtract":
        current_money = subtract_money(money.amount)
    return {"amount": current_money}