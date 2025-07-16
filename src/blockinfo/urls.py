from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter

from blockinfo.views import *

router = DefaultRouter()
router.register(r'students', StudentsViewSet)
router.register(r'links', LinksViewSet)
router.register(r'entrants', StudentEntryViewSet)

urlpatterns = [
    path('id-request/', get_id_via_email, name='get-id-via-email'),
    path('qrscan/', send_data_to_sheets, name='send-data-to-sheets'),
    path('qrscan/<uuid:identifier>/', qrscan_view, name='qrscan-detail'),

    re_path(r'^', include(router.urls)),
]
