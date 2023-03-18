import requests
import random
import time
from itertools import cycle
from fake_useragent import UserAgent
from bs4 import BeautifulSoup
# URL to scrape
url = 'https://www.emag.ro/side-by-side/c?ref=hp_menu_quick-nav_267_3&type=filter'

# list of proxies
proxies =  [
    "103.190.178.191:80"]

# create an iterator to cycle through the proxies
proxy_pool = cycle(proxies)

# create a user agent object
user_agent = UserAgent()

# loop through proxies and make requests
for i in range(len(proxies)):
    # get the next proxy from the pool
    proxy = next(proxy_pool)
    
    try:
        # set a random User-Agent header
        headers = {'User-Agent': user_agent.random}
        
        # make the request using the proxy
        response = requests.get(url, headers=headers, proxies={'http': "http://"+proxy})
        print(response.status_code)
        # check if the response is successful
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, "html.parser")
            class_element = soup.find_all(class_="card-item")
            print(class_element)
            break
        
    except requests.exceptions.RequestException as e:
        print(e)
        
    # add a random delay between requests
    time.sleep(random.uniform(0, 2))
