create table if not exists plan_type(
                                        id identity,
                                        name varchar(50) not null,
                                        status boolean not null
);