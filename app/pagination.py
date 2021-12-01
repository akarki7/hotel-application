from rest_framework.pagination import LimitOffsetPagination


class FinnPagination(LimitOffsetPagination):
    default_limit = 50
    max_limit = 100
