import cv2


class RegionOfInterest:
    def __init__(self, y, y2, x, x2, label):
        self.y = y
        self.y2 = y2
        self.x = x
        self.x2 = x2
        self.label = label

    def crop(self, im):
        return im[self.y:self.y2, self.x:self.x2], self.label



