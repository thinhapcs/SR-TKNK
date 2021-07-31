# import cv2

# url = 0
# cap = cv2.VideoCapture(url)
# detector = cv2.QRCodeDetector()
# a=""
# while True:
#     _,img=cap.read()
#     data,one,_=detector.detectAndDecode(img)
#     if data:
#         if a != data:
#             a = data
#             print(data)
#     cv2.imshow('qrcode', img)
#     if cv2.waitKey(1)==ord('q'):
#         break

def test(value):
    value += 2;

def main():
    value = 0
    print(value)
    test(value)
    print(value)

main()