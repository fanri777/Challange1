SELECT * FROM users;

CREATE TABLE IF NOT EXISTS public.items
(
    kode_produk VARCHAR(20) NOT NULL PRIMARY KEY,
    kategori_produk  VARCHAR(20) NOT NULL,
    nama_produk  VARCHAR(20) NOT NULL,
	stok_produk  INT NOT NULL,
	harga_produk  INT NOT NULL,
    "createdAt" DATE,
    "updatedAt" DATE
);

CREATE SEQUENCE order_no_seq;
CREATE TABLE IF NOT EXISTS public.orders
(
    no_order INT NOT NULL PRIMARY KEY DEFAULT nextval('order_no_seq'::regclass) ,
    email VARCHAR(100) NOT NULL,
    alamat_penerima VARCHAR(100) NOT NULL,
	total_pembayaran INT NOT NULL,
    "createdAt" DATE,
    "updatedAt" DATE
);
