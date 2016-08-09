import MySQLdb
import pytest
from celery import current_app
from django.conf import settings
from django.core.cache import cache
from django.core.management import call_command


@pytest.fixture
def db_conn():
    db_config = settings.DATABASES['default']
    db_options = db_config.get('OPTIONS', {})
    return MySQLdb.connect(
        host=db_config['HOST'],
        user=db_config['USER'],
        passwd=db_config.get('PASSWORD') or '',
        **db_options
    )


def test_no_missing_migrations():
    """Check no model changes have been made since the last `./manage.py makemigrations`."""
    with pytest.raises(SystemExit) as e:
        # Replace with `check_changes=True` once we're using a Django version that includes:
        # https://code.djangoproject.com/ticket/25604
        # https://github.com/django/django/pull/5453
        call_command('makemigrations', interactive=False, dry_run=True, exit_code=True)
    assert str(e.value) == '1'


def test_datasource_db_created(jobs_ds, db_conn):
    cur = db_conn.cursor()
    cur.execute("SHOW DATABASES;")
    rows = cur.fetchall()
    assert jobs_ds.name in [r[0] for r in rows], \
        "When a datasource is created, a new db should be created too"
    db_conn.close()


def test_memcached_setup():
    "Test memcached is properly setup"
    k, v = 'my_key', 'my_value'
    cache.set(k, v)
    assert cache.get(k) == v


@current_app.task
def add(x, y):
    return x + y


def test_celery_setup():
    "Test celery executes a task properly"

    result = add.delay(7, 3)
    assert result.wait() == 10


@pytest.mark.django_db(transaction=True)
def test_load_initial_data():
    "Test load_initial_data executes properly"

    call_command('load_initial_data')
