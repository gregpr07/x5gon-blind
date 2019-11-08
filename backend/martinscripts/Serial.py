import trueskill as t
import martinscripts.TrueLearn as TrueLearn

def skill_to_parm(TrueSkillObject):
    parms = []
    for i in TrueSkillObject.learners.keys():
        parms.append([TrueSkillObject.learners[i].mu,TrueSkillObject.learners[i].sigma])
    return parms

def parm_to_skill(parms):
    skill = TrueLearn.TrueSkill_classifier()
    for i in range(len(parms)):
        skill.learners[i] = t.Rating(parms[i][0],parms[i][1])
    return skill