import django_filters
from ..models import ATM, Branch


class BranchFilter(django_filters.FilterSet):
    province = django_filters.ChoiceFilter(choices=Branch.PROVINCES)
    district = django_filters.CharFilter(lookup_expr='icontains')
    city = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Branch
        fields = ['province', 'district', 'city']


class ATMFilter(django_filters.FilterSet):
    province = django_filters.ChoiceFilter(choices=Branch.PROVINCES)
    district = django_filters.CharFilter(lookup_expr='icontains')
    city = django_filters.CharFilter(lookup_expr='icontains')
    atm_type = django_filters.ChoiceFilter(choices=ATM.ATM_TYPES)
    is_24_hours = django_filters.BooleanFilter()
    is_operational = django_filters.BooleanFilter()

    class Meta:
        model = ATM
        fields = ['province', 'district', 'city', 'atm_type', 'is_24_hours', 'is_operational'] 