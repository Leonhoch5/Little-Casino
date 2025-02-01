
import pyautogui
import time

def main():
    while True:
        time.sleep(10)
        pyautogui.press('w')
        time.sleep(1)
        pyautogui.keyDown('alt')
        pyautogui.press('tab', presses=3, interval=0.1)
        pyautogui.keyUp('alt')

if __name__ == "__main__":
    main()