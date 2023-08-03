from django.urls import path
from .views import CustomUserCreate, UserSpamListView, UserBlockListView, LoginView, UserView, LogoutView, GetUserById, \
    WhoViewedListView, CommentListByPhoneNumber, PremiumUpdateAPIView

app_name = 'users'

urlpatterns = [
    path('create/', CustomUserCreate.as_view(), name="create_user"),
    path('create/<int:user_id>/', GetUserById.as_view(), name='user-detail'),
    path('login/', LoginView.as_view(), name="login_user"),
    path('logout/', LogoutView.as_view(), name="logout_user"),
    path('user/', UserView.as_view(), name="user"),
    path('user-spam-list/<int:user_id>/', UserSpamListView.as_view(), name='user-spam-list'),
    path('user-block-list/<int:user_id>/', UserBlockListView.as_view(), name='user-block-list'),
    path('who-viewed-list/<int:user_id>/', WhoViewedListView.as_view(), name='user-who-viewed-list'),
    path('comments/', CommentListByPhoneNumber.as_view(), name='comment-list-by-phone-number'),
    path('comments/<int:user_id>/', CommentListByPhoneNumber.as_view(), name='comment-post-by-phone-number'),
    path('update-premium/<int:pk>/', PremiumUpdateAPIView.as_view(), name='update_premium'),
]
