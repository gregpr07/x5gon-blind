import copy

attributes = {
'Perception' : {
'Text alternatives':{},
'Time-based media':{},
'Adaptability':{},
'Distinguishability':{}
},
'Operability' : {
'Keyboard accessibility':{},
'Time limitation':{},
'Navigation':{}
},
'Understandability' :{
'Readability':{},
'Predictability':{},
'Help with input':{}
}  
}



def annotate_learner(learners):
    i = 0
    user_attributes = copy.deepcopy(attributes)
    for topic in attributes.keys():
        for feature in attributes[topic].keys():
            user_attributes[topic][feature] = {}
            for value in range(4):
                user_attributes[topic][feature][value] = {'mu' : learners[i].mu, 'sigma' : learners[i].sigma}
                i += 1
    return user_attributes



