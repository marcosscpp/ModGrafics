from app import app, db
from flask import render_template, request, jsonify, url_for, redirect
from models import Atividades, Clientes, Funcionarios
from sqlalchemy import and_
import json


# import pandas as pd
# import matplotlib
# import matplotlib.pyplot as plt
# import matplotlib.dates as mdates
# import numpy as np

@app.route("/", methods=['GET', 'POST'])
def index():
  # Dates
  min_date = db.session.query(db.func.min(Atividades.data)).scalar()
  max_date = db.session.query(db.func.max(Atividades.data)).scalar()

  # Filters
  lista_clientes = Clientes.query.all()
  lista_atividades = Atividades.query.with_entities(Atividades.tipo_de_acao).distinct().all()

  return render_template("index.html", min=min_date, max=max_date, clientes=lista_clientes, atividades=lista_atividades)


@app.route("/get-filter-data", methods=["POST"])
def create_plot():
  data = json.loads(request.data)
  start_date = data["start-date"]
  end_date = data["end-date"]
  clients = data["clients"]
  actions = data["actions"]
  registers_query =  Atividades.query.order_by(Atividades.data)
  
  if actions != "0":
    registers_query = registers_query.filter(Atividades.tipo_de_acao == actions)
  if clients != "0":
    registers_query = registers_query.filter(Atividades.cliente_id == clients)
  if start_date:
    registers_query = registers_query.filter(Atividades.data >= start_date)
  if end_date:
    registers_query = registers_query.filter(Atividades.data <= end_date)
  
  registers = registers_query.all()
  results_list = [{"date": register.data, "amount": register.quantidade} for register in registers]
  return jsonify(results_list)
