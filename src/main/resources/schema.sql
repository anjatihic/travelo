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
    image_url varchar(400)
);

create table if not exists user_details
(
    id identity,
    username varchar(50) not null unique,
    f_name varchar(30) not null,
    l_name varchar(40) not null,
    email varchar(80) not null,
    hash_pass varchar(500) not null,
    created_at datetime not null
);