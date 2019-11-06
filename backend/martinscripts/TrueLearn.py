import itertools
import math
import trueskill as t
import numpy as np


class TrueSkill_classifier:
    def __init__(self, starting_skill = 0, starting_var = (25/3), BETA = 25/6):
        #starting skill is defenitly 0, starting var has to be determined
        self.st_skill = starting_skill
        self.st_var = starting_var
        self.BETA = BETA
        self.learners = {}
        


    def win_probability(self,team1, team2):
        delta_mu = sum(r.mu for r in team1) - sum(r.mu for r in team2)
        sum_sigma = sum(r.sigma ** 2 for r in itertools.chain(team1, team2))
        size = len(team1) + len(team2)
        denom = math.sqrt(size * (self.BETA * self.BETA) + sum_sigma)
        ts = t.global_env()
        return ts.cdf(delta_mu / denom)

    
    
    def fit(self,X,y, bias = False):
        #each instance of X is its own team
        #each feature is its own player
        
        #initialise features
        if self.learners == {}:
            for i in range(X.shape[1]):
                self.learners[i] = t.Rating(self.st_skill,self.st_var)
        
        if bias == True:
            
            self.learners['B'] = t.Rating(self.st_skill,self.st_var)
            
        #iterate over rows
        for i in range(X.shape[0]):
            
            #print(X[i,:])
            active_features = np.where(X[i,:] == 1)[0]
            
            
                
            #print(active_features)
            
            team_features = [self.learners[i] for i in active_features]
            
            if bias == True:
                team_features.append(self.learners['B'])
                
            dummy_features = [t.Rating(0,1/10000) for i in active_features]
            if y[i] == 1:
                #lower rank is better!!!
                (team_features,_) = t.rate([team_features,dummy_features],ranks=[0,1])
            else:
                (team_features,_) = t.rate([team_features,dummy_features],ranks=[1,0])
                
                            
            #print(team_features[-1])
            
            for i in range(len(active_features)):
                    #print(active_features[i])
                self.learners[active_features[i]] = team_features[i]
            
            #update learners
            if bias == True:
                self.learners['B'] = team_features[-1]
                #print(self.learners['B'])
            
        return None
            
    
    
    
    def predict_proba(self,X):
        #prediction is evaluation of instance against dummy team
        
        #predicted vector (probability that first wins)
        y_pred = []
        for i in range(X.shape[0]):
            active_features = np.where(X[i,:] == 1)[0]

            team_features = [self.learners[i] for i in active_features]
            dummy_features = [t.Rating(0,1/10000) for i in active_features]
            
            y_pred.append(self.win_probability(team_features,dummy_features))
        return y_pred
    
    def predict(self,X):
        y_proba = self.predict_proba(X)
        
        return([1 if i > 0.5 else 0 for i in y_proba])
        
        