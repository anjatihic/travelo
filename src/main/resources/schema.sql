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
    trip_end   date         not null
);