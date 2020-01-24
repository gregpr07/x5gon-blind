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

def dist_sum_per_value(a_l):
    new_dict = {}
    for topic in a_l.keys():
        values_map = {0: {'mu':0, 'sigma':0}, 1: {'mu':0, 'sigma':0}, 2: {'mu':0, 'sigma':0}, 3: {'mu':0, 'sigma':0}}
        for feature in a_l[topic].keys():
            for value in a_l[topic][feature].keys():
                values_map[value]['mu'] += a_l[topic][feature][value]['mu']
                values_map[value]['sigma'] += a_l[topic][feature][value]['sigma']
        new_dict[topic] = values_map
    return new_dict

def most_important_value_topic(new_dict):
    max_value_dict = {}
    for topic in new_dict.keys():
        max_value = 0
        max_mu = 0
        max_sigma = 0
        for value in new_dict[topic].keys():
            if abs(new_dict[topic][value]['mu']) > abs(new_dict[topic][max_value]['mu']):
                max_value = value
                max_mu = new_dict[topic][value]['mu']
                max_sigma = new_dict[topic][value]['sigma']
        max_value_dict[topic] = {'value': max_value, 'mu': max_mu, 'sigma':max_sigma}
    return(max_value_dict)
    
def topic_summary(annotated_dict):
    return most_important_value_topic(dist_sum_per_value(annotated_dict))

def player_summary(learner):
    summary = topic_summary(annotate_learner(learner))
    return [list(summary.keys()), list(summary.values())]
