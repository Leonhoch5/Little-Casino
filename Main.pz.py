import time
import pyautogui
from datetime import datetime
from pathlib import Path

output_file1 = Path("trash.txt")
output_file2 = Path("../test-1/trash.txt")
counter = 1

print("Writing to files... Press ESC to stop")

try:
    while True:
        if pyautogui.press('esc'):
            print("\nStopping...")
            break
           
        timestamp = datetime.now().strftime("%H:%M:%S")
       
        # Write to first file
        with open(output_file1, 'a') as f1:
            f1.write(f'{counter} - {timestamp}\n')
           
        # Write to second file
        with open(output_file2, 'a') as f2:
            f2.write(f'{counter} - {timestamp}\n')
           
        counter += 1
        time.sleep(9)
       
except KeyboardInterrupt:
    print("\nProgram stopped")
    