import os
import pipes
import subprocess
import logging

def run(command):
    
    logger = logging.getLogger(__name__)

    logger.debug(command)

    os.environ['PATH'] = '/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin:/usr/local/share/npm/bin:'

    process = subprocess.Popen([command], 
        shell=True, 
        stdin=subprocess.PIPE, 
        stdout=subprocess.PIPE, 
        stderr=subprocess.PIPE)

    stdout = process.stdout.readline()
    stderr = process.stderr.readline()

    if stdout: logger.info(stdout)
    if stderr: logger.warning(stderr)

def preBuild(site):
  run('sass -t compressed --update %s/css/main.sass' % pipes.quote(site.static_path))

# def postBuild(site):
#     os.system(
#     		# %s/static/css/*.sass -> %s/static/css/main.sass
#         'sass -t compressed --update %s/static/css/main.sass' % 
#             pipes.quote(site.paths['build']
#     ))
