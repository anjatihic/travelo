create table if not exists plan_type
(
    id     identity,
    name   varchar(50) not null,
    status boolean     not null
);

create table if not exists travel_group
(
    id         identity,
    code       varchar(50)  not null unique,
    name       varchar(100) not null,
    created_at date         not null,
    status     boolean      not null,
    trip_start date         not null,
    trip_end   date         not null,
    description varchar(700),
    image varchar(400)
);

create table if not exists users_info
(
    id identity,
    username varchar(50) not null unique,
    email varchar(80) not null unique,
    password varchar(500) not null
);

create table if not exists roles
(
    id identity,
    name varchar(50) not null unique
);

create table if not exists users_authority
(
    user_id long not null,
    role_id long not null
);

create table if not exists travel_group_users
(
    travel_group_id long not null,
    user_id long not null
);

create table if not exists post
(
    id identity,
    content varchar(1000) not null,
    created_at timestamp not null,
    status boolean,
    poster_id long not null,
    group_id long not null,
    plan_type_id long not null,
    planned_date date,
    title varchar(100),
    url varchar(1000),
    constraint fk_poster foreign key (poster_id) references users_info(id),
    constraint fk_group foreign key (group_id) references travel_group(id),
    constraint fk_plan_type foreign key (plan_type_id) references plan_type(id)
);