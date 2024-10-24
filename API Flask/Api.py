# pip install flask flask-jsonpify flask-sqlalchemy flask-restful
# python Api.py run

from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from sqlalchemy import create_engine
from sqlalchemy import text
from json import dumps


db_connect = create_engine('sqlite:///Barber.db',
                           pool_size=5, max_overflow=0)
app = Flask(__name__)
api = Api(app)



# class Users(Resource):
#     def get(self):
#         conn = db_connect.connect()
#         query = conn.execute(text("select * from user"))
#         result = [dict(zip(tuple(query.keys()), i)) for i in query.cursor]
#         return jsonify(result)

#     def post(self):
#         conn = db_connect.connect()
#         name = request.json['name']
#         email = request.json['email']

#         conn.execute(
#             "insert into user values(null, '{0}','{1}')".format(name, email))

#         query = conn.execute(
#             text('select * from user order by id desc limit 1'))
#         result = [dict(zip(tuple(query.keys()), i)) for i in query.cursor]
#         return jsonify(result)

#     def put(self):
#         conn = db_connect.connect()
#         id = request.json['id']
#         name = request.json['name']
#         email = request.json['email']

#         conn.execute(text("update user set name ='" + str(name) +
#                      "', email ='" + str(email) + "'  where id =%d " % int(id)))

#         query = conn.execute(text("select * from user where id=%d " % int(id)))
#         result = [dict(zip(tuple(query.keys()), i)) for i in query.cursor]
#         return jsonify(result)


# class UserById(Resource):
#     def delete(self, id):
#         conn = db_connect.connect()
#         conn.execute(text("delete from user where id=%d " % int(id)))
#         return {"status": "success"}

#     def get(self, id):
#         conn = db_connect.connect()
#         query = conn.execute(
#             text("select * from user where id =%d " % int(id)))
#         result = [dict(zip(tuple(query.keys()), i)) for i in query.cursor]
#         return jsonify(result)


class Login(Resource):
    def post(self):
        conn = db_connect.connect()
        user = request.json['usuario']
        senha = request.json['senha']

        try:
            query = conn.execute(text(
                "select * from user where usuario ='{}' and senha = '{}'".format(user, senha)))
            result = [dict(zip(tuple(query.keys()), i)) for i in query.cursor]
            return jsonify(result)
        except Exception as erro:
            return({"error":str(erro)})
        finally:
            conn.close() 

        
        

class Cadastra(Resource):
    def post(self):
        conn = db_connect.connect()
        name = request.json['name']
        email = request.json['email']
        usuario = request.json['usuario']
        senha = request.json['senha']
        telefone = request.json['telefone']

        try:
            conn.execute(text("insert into user(name,email,usuario,senha,telefone) values ('{}','{}','{}','{}','{}');".format(name,email,usuario,senha,telefone)))
            conn.commit()
            conn.close()
            return jsonify({"status": "cadastrado"})
        except Exception as erro:
            return jsonify({"error": str(erro)})
        finally:
            conn.close()

class Produtos(Resource):
    def get(self):
        conn = db_connect.connect()
        try:
            query = conn.execute(text(
                "select * from produtos"))
            result = [dict(zip(tuple(query.keys()), i)) for i in query.cursor]
            return jsonify(result)
        except Exception as erro:
            return({"error":str(erro)})
        finally:
            conn.close() 
    
    def post(self):
        conn = db_connect.connect()
        nome = request.json['nome']
        descricao = request.json['descricao']
        preco = request.json['preco']
        imagem = request.json['imagem']

        try:
            conn.execute(text("insert into produtos(nome,descricao,preco,imagem) values ('{}','{}','{}','{}');".format(nome,descricao,preco,imagem)))
            conn.commit()
            conn.close()
            return jsonify({"status": "cadastrado"})
        except Exception as erro:
            return jsonify({"error": str(erro)})
        finally:
            conn.close()

    def delete(self):
        conn = db_connect.connect()
        id = request.json['id']
        

        try:
            conn.execute(text("delete from produtos where id ={}".format(id)))
            conn.commit()
            conn.close()
            return jsonify({"status": "excluido com sucesso"})
        except Exception as erro:
            return jsonify({"error": str(erro)})
        finally:
            conn.close()
        





class Servicos(Resource):
    def get(self):
        conn = db_connect.connect()
        try:
            query = conn.execute(text(
                "select * from servicos"))
            result = [dict(zip(tuple(query.keys()), i)) for i in query.cursor]
            return jsonify(result)
        except Exception as erro:
            return({"error":str(erro)})
        finally:
            conn.close() 
    
    def post(self):
        conn = db_connect.connect()
        
        nome = request.json['nome']
        descricao = request.json['descricao']
        preco = request.json['preco']
        duracao = request.json['duracao']
        imagem = request.json['imagem']

        try:
            conn.execute(text("insert into servicos(nome,descricao,preco,duracao,imagem) values ('{}','{}','{}','{}','{}');".format(nome,descricao,preco,duracao,imagem)))
            conn.commit()
            conn.close()
            return jsonify({"status": "cadastrado"})
        except Exception as erro:
            return jsonify({"error": str(erro)})
        finally:
            conn.close()

    def delete(self):
        conn = db_connect.connect()
        id = request.json['id']
        

        try:
            conn.execute(text("delete from servicos where id ={}".format(id)))
            conn.commit()
            conn.close()
            return jsonify({"status": "excluido com sucesso"})
        except Exception as erro:
            return jsonify({"error": str(erro)})
        finally:
            conn.close()
        

# api.add_resource(Users, '/users')
# api.add_resource(UserById, '/users/<id>')
api.add_resource(Login, '/login')
api.add_resource(Cadastra, '/cadastra')
api.add_resource(Produtos, '/produtos')
api.add_resource(Servicos, '/servicos')

if __name__ == '__main__':
    app.run()
