from selectorlib.formatter import Formatter
import re

class AvatarUrl(Formatter):
    def format(self, text):
        return re.findall(r'\'(.+?)\'')
        