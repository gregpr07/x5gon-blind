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

def return_biggest_value_mu(feature_dict):
    max_value = list(feature_dict.keys())[0]
    max_mu = 0
    max_sigma = 0
    for value in feature_dict.keys():
        if abs(feature_dict[value]['mu']) > abs(feature_dict[max_value]['mu']):
            max_value = value
            max_mu = feature_dict[value]['mu']
            max_sigma = feature_dict[value]['sigma']
    return {'max_value':value, 'mu':max_mu, 'sigma':max_sigma}

def return_summary_gaussian(annotated_dict):
    summary = {}
    for topic in annotated_dict.keys():
        summary[topic] = {}
        biggest_mu = 0
        for feature in annotated_dict[topic].keys():
            feature_dict = return_biggest_value_mu(annotated_dict[topic][feature])
            
            if abs(feature_dict['mu']) > abs(biggest_mu):
                summary[topic] = feature_dict
    return(summary)

def player_summary(learners):
    summ = return_summary_gaussian(annotate_learner(learners))
    return [list(summ.keys()),list(summ.values())]


