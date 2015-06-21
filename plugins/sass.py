import os
import pipes

def postBuild(site):
    os.system(
    		# %s/static/css/*.sass -> %s/static/css/main.sass
        'sass -t compressed --update %s/static/css/main.sass' % 
            pipes.quote(site.paths['build']
    ))
