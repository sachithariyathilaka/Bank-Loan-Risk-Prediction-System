import numpy as np
from flask import Flask, request, jsonify, render_template
import pickle
import mysql.connector

app = Flask(__name__)
model = pickle.load(open('model.pkl', 'rb'))

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict',methods=['POST'])
def predict():
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="",
        database="bank_application"
    )
    nic = request.form['nic']
    mycursor = mydb.cursor()
    sql = "SELECT CreditScore,Education,Gender FROM application WHERE NIC = "+nic
    mycursor.execute(sql, nic)
    myresult = mycursor.fetchall()
    #int_features = [int(x) for x in request.form.values()]
    prediction = model.predict(myresult)
    if prediction == ['N']:
        value = 'False'
        sql3 = "UPDATE application SET Prediction ="+value
        mycursor.execute(sql3)
        mydb.commit()
    if prediction == ['Y']:
        value = 'True'
    sql2 = "UPDATE application SET Prediction ="+value
    mycursor.execute(sql2)
    mydb.commit()
    return render_template('index.html', prediction_text='Bank Loan Approval Prediction is {}'.format(value))
if __name__ == "__main__":
    app.run(debug=True)