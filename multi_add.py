import os
add_list = ["DBAG0K-A9009ZRQC-000","DBAG0K-1900AZBJY-000"]

for index in add_list:
    os.system("node multi_add_cart.js {} {}".format(index,len(add_list)))
