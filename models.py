from app import db

class Atividades(db.Model):
  __tablename__ = 'atividades'
  atividade_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  funcionario_id = db.Column(db.Integer, db.ForeignKey("funcionarios.funcionario_id"))
  cliente_id = db.Column(db.Integer, db.ForeignKey("clientes.cliente_id"))
  tipo_de_acao = db.Column(db.String(60))
  quantidade = db.Column(db.Integer)
  data = db.Column(db.Date)
  
  funcionarios = db.relationship("Funcionarios", backref=db.backref("atividades", lazy=True))
  clientes = db.relationship("Clientes", backref=db.backref("atividades", lazy=True))

class Clientes(db.Model):
  __tablename__ = 'clientes'
  cliente_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  nome = db.Column(db.String(60))
  cidade = db.Column(db.String(255))

class Funcionarios(db.Model):
  __tablename__ = 'funcionarios'
  funcionario_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  nome = db.Column(db.String(60))
  email = db.Column(db.String(60))
