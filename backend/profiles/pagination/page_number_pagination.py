from rest_framework import pagination
from rest_framework.response import Response


class PageNumberPagination(pagination.PageNumberPagination):

    def get_paginated_response(self, data):
        return Response({
            'current': self.page.number,
            'next': self.get_next_page_number(),
            'previous': self.get_previous_page_number(),
            'count': self.page.paginator.count,
            'results': data
        })

    def get_next_page_number(self):
        if not self.page.has_next():
            return None
        return self.page.next_page_number()

    def get_previous_page_number(self):
        if not self.page.has_previous():
            return None
        return self.page.previous_page_number()
