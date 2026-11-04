
import { test, expect } from '@playwright/test';

test('TC-01: Login berhasil dengan akun valid', async ({ page }) => {
  // 1. Buka halaman login
  await page.goto('https://www.saucedemo.com/');

  // 2. Isi username
  await page.locator('#user-name').fill('standard_user');

  // 3. Isi password
  await page.locator('#password').fill('secret_sauce');

  // 4. Klik tombol login
  await page.locator('#login-button').click();

  // 5. Validasi URL setelah login
  await expect(page).toHaveURL(/inventory\.html/);

  // 6. Validasi halaman produk tampil
  await expect(page.locator('.inventory_list')).toBeVisible();
});


test('TC-02: Login gagal dengan password salah', async ({ page }) => {
  // 1. Buka halaman login
  await page.goto('https://www.saucedemo.com/');

  // 2. Isi username yang valid
  await page.locator('#user-name').fill('standard_user');

  // 3. Isi password yang salah
  await page.locator('#password').fill('password_salah');

  // 4. Klik tombol login
  await page.locator('#login-button').click();

  // 5. Pastikan pesan error tampil
  await expect(page.locator('[data-test="error"]')).toBeVisible();

  // 6. Pastikan pesan error sesuai
  await expect(page.locator('[data-test="error"]'))
    .toContainText('Username and password do not match');
});


test('TC-03: Login gagal dengan password kosong', async ({ page }) => {
  // 1. Buka halaman login
  await page.goto('https://www.saucedemo.com/');

  // 2. Isi username yang valid
  await page.locator('#user-name').fill('standard_user');

  // 3. Biarkan password kosong

  // 4. Klik tombol login
  await page.locator('#login-button').click();

  // 5. Pastikan pesan error tampil
  await expect(page.locator('[data-test="error"]')).toBeVisible();

  // 6. Pastikan pesan error sesuai
  await expect(page.locator('[data-test="error"]'))
    .toContainText('Password is required');
});


test('TC-04: Login gagal dengan username kosong', async ({ page }) => {
  // 1. Buka halaman login
  await page.goto('https://www.saucedemo.com/');

  // 2. Biarkan username kosong

  // 3. Isi password yang valid
  await page.locator('#password').fill('secret_sauce');

  // 4. Klik tombol login
  await page.locator('#login-button').click();

  // 5. Pastikan pesan error tampil
  await expect(page.locator('[data-test="error"]')).toBeVisible();

  // 6. Pastikan pesan error sesuai
  await expect(page.locator('[data-test="error"]'))
    .toContainText('Username is required');
});


test('TC-05: Login gagal dengan username tidak valid', async ({ page }) => {
  // 1. Buka halaman login
  await page.goto('https://www.saucedemo.com/');

  // 2. Isi username yang tidak terdaftar
  await page.locator('#user-name').fill('user_tidak_terdaftar');

  // 3. Isi password
  await page.locator('#password').fill('secret_sauce');

  // 4. Klik tombol login
  await page.locator('#login-button').click();

  // 5. Pastikan pesan error tampil
  await expect(page.locator('[data-test="error"]')).toBeVisible();

  // 6. Pastikan pesan error sesuai
  await expect(page.locator('[data-test="error"]'))
    .toContainText('Username and password do not match any user in this service');
});


test('TC-06: Login gagal dengan akun terkunci', async ({ page }) => {
  // 1. Buka halaman login
  await page.goto('https://www.saucedemo.com/');

  // 2. Isi username akun terkunci
  await page.locator('#user-name').fill('locked_out_user');

  // 3. Isi password
  await page.locator('#password').fill('secret_sauce');

  // 4. Klik tombol login
  await page.locator('#login-button').click();

  // 5. Pastikan pesan error tampil
  await expect(page.locator('[data-test="error"]')).toBeVisible();

  // 6. Pastikan pesan error sesuai
  await expect(page.locator('[data-test="error"]'))
    .toContainText('Sorry, this user has been locked out.');
});


test('TC-07: Login berhasil dengan problem user', async ({ page }) => {
  // 1. Buka halaman login
  await page.goto('https://www.saucedemo.com/');

  // 2. Isi username problem user
  await page.locator('#user-name').fill('problem_user');

  // 3. Isi password
  await page.locator('#password').fill('secret_sauce');

  // 4. Klik tombol login
  await page.locator('#login-button').click();

  // 5. Pastikan berhasil masuk ke halaman inventory
  await expect(page).toHaveURL(/inventory\.html/);

  // 6. Pastikan daftar produk tampil
  await expect(page.locator('.inventory_list')).toBeVisible();
});
