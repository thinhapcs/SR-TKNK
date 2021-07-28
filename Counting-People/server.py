from time import strftime
from fastapi import FastAPI as fa
import pandas as pd
from datetime import date
import time
import os
import matplotlib.pyplot as plt
import numpy as np
app = fa()


@app.post('/ppct')
def ppct(totalUp: int, totalDown: int):
    try:
        if os.path.isfile('people_counting.csv'):
            df = pd.read_csv('people_counting.csv')
        else:
            df = pd.DataFrame(columns=['date', 'time', 'totalUp', 'totalDown'])
        t = time.localtime()
        current_time = time.strftime("%H", t)
        today = date.today()
        day = today.strftime('%d/%m/%y')
        df = df.append({'date': day, 'time': current_time,
                        'totalUp': totalUp, 'totalDown': totalDown}, ignore_index=True)
        df.to_csv('people_counting.csv', index=False)

    except:
        return "Error."
    return 200

@app.post("/draw_traffic_graph")
def draw_traffic_graph(day:int , month: int, year: int):
        if os.path.isfile('people_counting.csv'):
            orders = pd.read_csv('people_counting.csv')
            # orders = orders.loc[orders.date=="{}/{}/{}".format(day, month, year)]
            x = np.arange(len(orders.date))  # the label locations
            width = 0.4  # the width of the ba
            fig, ax = plt.subplots()
            ax.bar(orders.time, orders.totalUp, width, label='totalUp')
            ax.bar(orders.time, orders.totalDown, width, label='totalDown')

            # Add some text for labels, title and custom x-axis tick labels, etc.
            ax.set_ylabel('Customers')
            ax.set_xlabel('Time')
            ax.set_title('Customers per Times')
            ax.legend()
            fig.tight_layout()
            fig.savefig('Customer_diagram.jpg')

        else:
            return "DON'T HAVE ANY RECORDS"
        return "OK"