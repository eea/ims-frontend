FROM plone:5.2.4

RUN mv buildout.cfg plone-buildout.cfg
COPY buildout.cfg /plone/instance/
RUN buildout \
 && find /data  -not -user plone -exec chown plone:plone {} \+ \
 && find /plone -not -user plone -exec chown plone:plone {} \+
