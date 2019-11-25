questions_options = {'Text alternatives: how much non-text content has text alternatives':[
'AAA: all non-text content has text alternatives'
'AA: majority of non-text content has text alternatives'
'A: some non-text content has text alternatives'
'Non-compliant: no text alternatives are provided'
],

'Time-based media: now much of time based media has alternatives':[
'AAA: all non-text content has text alternatives'
'AA: majority of non-text content has text alternatives'
'A: some non-text content has text alternatives'
'Non-compliant: no text alternatives are provided'
],

'Adaptability: is content presented in a simplified way that is compatible with a screen reader':[
'AAA: all content is presented in a simplified way'
'AA: majority of content is presented in a simplified way'
'A: only a small fraction of content is presented in a simplified way'
'Non-compliant: no content is presented in a simplified way'
],

'Distinguishability: is viewing of web content simplified for the user':[
'AAA: foreground and background color can be modified'
'AA: Sound management mechanism is separated from system for web site navigation'
'A: colors do not carry information'
'Non-compliant: content is nod made easily distinguishable for the user'
],


'Keyboard accessibility: is the web content accessible with the keyboard':[
'AAA: the whole web site is accessible with the keyboard'
'AA: most of the web site is accessible with the keyboard'
'A: main parts of web site are accessible with the keyboard'
'Non-compliant: web content is completely inaccessible with the keyboard'
],

'Time limitation for interacting with the web content: is interaction with the web site time limited':[
'AAA: web site contains no time limited content'
'AA: user has the possibility to set speed of time limited content for all time limited content'
'A: user has the possibility to set speed for most of time limited content'
'Non-compliant: web content requires a lot of time-limited interaction'
],
'Navigation: does the website support easy navigation':[
'AAA: purpose and location (inside the same web site/outside) is clear from the name of the link'
'AA: web content supports different ways to navigate to it'
'A: navigation sequence between web contents is logical and intuitive'
'Non-compliant: navigation on the web content is difficult and unintuitive'
],

'Readability: is the content readable and understandable':[
'AAA: the content has support for different levels of reading (simplified versions of content are available)'
'AA: All parts of web content (if applicable) have marked the language in which they are written'
'A: It is marked in which language the web site is written'
'Non-compliant: web content is written in different languages and is written in difficult to understand style'
],

'Predictability: are web sites organized in a logical and predictable way':[
'AAA: Bigger changes to the user interface that happen automatically can be disabled'
'AA: Navigation of the website is consistent across all parts of the website'
'A: Changes to the user interface do not happen automatically'
'Non-compliant: interaction of web site with the user is inherently unpredictable'
],

'Help with input: Web site automatically detects and corrects input mistakes from the user':[
'AAA: Web site provides context aware help with instructions and recommendations for input'
'AA: In case the user makes an input mistake web site automatically suggests corrections'
'A: Web site automatically detects input mistake'
'Non-compliant: there is no help with user input'
]}

def get_questions():
    return questions_options