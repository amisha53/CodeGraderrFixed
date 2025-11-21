from rapidfuzz import fuzz

def compare_files(path1, path2):
    text1 = open(path1).read()
    text2 = open(path2).read()
    return fuzz.ratio(text1, text2)
