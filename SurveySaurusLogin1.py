from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import time

options = webdriver.ChromeOptions()
options.add_argument('headless')
options.add_argument('--disable-infobars')
options.add_argument('--disable-dev-shm-usage')
options.add_argument('--no-sandbox')
options.add_argument('--remote-debugging-port=9222')
options.add_argument('--window-size=1920,1080')
driver = webdriver.Chrome(options=options)


driver.maximize_window()

def login(username, password):
    driver.get("https://survey-ui.orangeground-88d990d8.westeurope.azurecontainerapps.io/")
    driver.find_element(By.CLASS_NAME, "loginButton").click()
    driver.find_element(By.XPATH, "/html/body/div/div/div[4]/div[3]/form/div[1]/input").send_keys(username)
    driver.find_element(By.XPATH, "/html/body/div/div/div[4]/div[3]/form/div[2]/input").send_keys(password)
    driver.find_element(By.XPATH, "/html/body/div/div/div[4]/div[3]/form/div[4]/button").click()
    time.sleep(3)
    return 0

login("123@gmail.com", "Ae123456")
mesaj = driver.find_element(By.CLASS_NAME, "wrongLogIn").text
if "Incorrect email or password" in mesaj:
    print("Şifre hatalı girildiğinde doğru uyarı verilmiştir.")
else:
    print("HATA: Şifre hatalı girilmesine rağmen uyarı verilmemiştir.")

login("12345@gmail.com", "Ae123456")
mesaj = driver.find_element(By.CLASS_NAME, "wrongLogIn").text
if "Incorrect email or password" in mesaj:
    print("Kullanıcı adı hatalı girildiğinde doğru uyarı verilmiştir.")
else:
    print("HATA: Kullanıcı adı yanlış girilmesine rağmen uyarı verilmemiştir.")

login("123@gmail.com", "Ue123456")
time.sleep(5)
if "userPage" in driver.current_url:
    print("Kullanıcı adı ve şifre doğru yazıldığında başarılı bir şekilde giriş yapılmıştır. ")
else:
    print("HATA: Kullanıcı adı ve şifre doğru yazıldığında başarılı bir şekilde giriş yapılamamıştır. ")

driver.quit()
