"""create tables

Revision ID: 433c26f80e3b
Revises: 
Create Date: 2020-10-26 13:09:44.706064

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '433c26f80e3b'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('bots',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('developer_token', sa.String(length=100), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('rules',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('bot_id', sa.Integer(), nullable=False),
    sa.Column('prefix', sa.String(length=100), nullable=True),
    sa.Column('content', sa.Text(), nullable=False),
    sa.ForeignKeyConstraint(['bot_id'], ['bots.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('rules')
    op.drop_table('bots')
    op.drop_table('users')
    # ### end Alembic commands ###
