create table jss_categories
(
  id          serial       not null
    constraint jss_category_pk
      primary key,
  name        varchar(255) not null,
  slug        varchar(255) not null,
  "createdAt" date,
  "updatedAt" date
);

alter table jss_categories
  owner to postgres;

create table jss_items
(
  id           serial           not null
    constraint jss_items_pk
      primary key,
  category_id  integer          not null
    constraint jss_items_jss_category_id_fk
      references jss_categories
      on update cascade on delete cascade,
  name         varchar(255)     not null,
  slug         varchar(255)     not null,
  quantity     integer          not null,
  quantity_buy integer          not null,
  price        double precision not null,
  url          text,
  image        text
);

alter table jss_items
  owner to postgres;

create table jss_products
(
  id   serial       not null
    constraint jss_product_pk
      primary key,
  name varchar(255) not null,
  slug varchar(255) not null
);

alter table jss_products
  owner to postgres;

create table jss_products_items
(
  id            serial  not null
    constraint jss_products_items_pk
      primary key,
  item_id       integer not null
    constraint jss_products_items_jss_items_id_fk
      references jss_items,
  product_id    integer not null
    constraint jss_products_items_jss_products_id_fk
      references jss_products,
  quantity_make integer not null
);

alter table jss_products_items
  owner to postgres;
