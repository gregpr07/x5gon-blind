def speculative_induction_pozitive(attribute_representation, max_value):
    # assuming that all attributes are ordinal 
    # 0 is negative
    # also assuming: 1 -> 2 -> 3
    assumed_representations = [attribute_representation]
    for i in range(len(attribute_representation)):
        stopper = attribute_representation[i]
        if True:
        #if stopper > 0:
            while True:
                stopper += 1
                if stopper > max_value: break
                ar = [-1 for i in range(len(attribute_representation))]
                ar[i] = stopper
                assumed_representations.append(ar)
    return assumed_representations
    

def speculative_induction_negative(attribute_representation, min_value = 0):
    # assuming that all attributes are ordinal 
    # 0 is negative
    # assuming: 3 -> 2 -> 1 -> 0
    assumed_representations = [attribute_representation]
    for i in range(len(attribute_representation)):
        stopper = attribute_representation[i]
        if True:
        #if stopper > 0:
            while True:
                stopper -= 1
                if stopper < 0: break
                ar = [-1 for i in range(len(attribute_representation))]
                ar[i] = stopper
                assumed_representations.append(ar)
    return assumed_representations


def learning_score(attribute_representation, max_value):
    score = 0
    for i in attribute_representation:
        if i > 0: score += max_value - i
    return score