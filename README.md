# jqestate

.drone.yml:
# This file contains drone configuration.
# Drone is not really good with separating builds and deploys to several hosts
# so this file is really long and complicated.
# Here is some info about infrastructure and drone configuration.

# We have one development server and two production servers.
# In this file we have three sections for each server: dev, prod-1 and prod-2.
# Configurations for each of this servers are very alike, so this file can be divided
# to three similar parts. We have two different sections for two prod clusters
# not because we want to make this file too complicated, but because we want to deploy
# to second prod server only when we make sure that service on first server works fine
# after deployment. This can prevent service downtime because if build fails for first server
# or if there some critical bugs, this flaws won't make it to the second server and load ballancer
# will just stop sending requests to the first server.

# Development environment
