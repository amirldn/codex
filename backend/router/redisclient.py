import redis

redisi = redis.StrictRedis(host='localhost', port=6379, db=0, decode_responses=True)
