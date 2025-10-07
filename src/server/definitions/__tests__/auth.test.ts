import { describe, expect, it } from 'vitest';
import { emailSchema, nameSchema, passwordSchema, signInSchema } from '@/server/definitions/auth';

describe('auth basic schemas', () => {
  it('nameSchema success', () => {
    expect(nameSchema.parse('test')).toEqual('test');
  });

  it('nameSchema error', () => {
    expect(() => nameSchema.parse('')).toThrowError(
      'Too small: expected string to have >=3 characters',
    );
    expect(() => nameSchema.parse('a'.repeat(51))).toThrowError(
      'Too big: expected string to have <=50 characters',
    );
  });

  it('emailSchema success', () => {
    expect(emailSchema.parse('test@example.com')).toEqual('test@example.com');
  });

  it('emailSchema error', () => {
    expect(() => emailSchema.parse('test')).toThrowError('Invalid email address');
  });

  it('passwordSchema success', () => {
    expect(passwordSchema.parse('testuser')).toEqual('testuser');
  });

  it('passwordSchema error', () => {
    expect(() => passwordSchema.parse('test')).toThrowError(
      'Too small: expected string to have >=8 characters',
    );
    expect(() => passwordSchema.parse('a'.repeat(21))).toThrowError(
      'Too big: expected string to have <=20 characters',
    );
  });
});

describe('auth', () => {
  it('signInSchema success', () => {
    const validData = {
      email: 'test@example.com',
      password: 'password123',
    };

    expect(signInSchema.parse(validData)).toEqual(validData);
  });

  it('signInSchema email error', () => {
    expect(() =>
      signInSchema.parse({
        password: 'password123',
      }),
    ).toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "expected": "string",
          "code": "invalid_type",
          "path": [
            "email"
          ],
          "message": "Invalid input: expected string, received undefined"
        }
      ]]
    `);
  });

  it('signInSchema password error', () => {
    expect(() =>
      signInSchema.parse({
        email: 'test@example.com',
      }),
    ).toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "expected": "string",
          "code": "invalid_type",
          "path": [
            "password"
          ],
          "message": "Invalid input: expected string, received undefined"
        }
      ]]
    `);
  });
});
