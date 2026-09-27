import {describe, it, after, before} from 'node:test'
import assert from 'node:assert'
import { Client } from '@modelcontextprotocol/sdk/client'
import { createTestClient } from './helpers.ts'


async function encryptMessage(client:Client, message: string, encryptionKey: string) {
    const result = await client.callTool({
        name: 'encrypt_message',
        arguments: {
            message,
            encryptionKey
        }
    }) as unknown as { structuredContent: {
        encryptedMessage: string
    }}

    return result
}

async function decryptMessage(client:Client, encryptedMessage: string, encryptionKey: string) {
    const result = await client.callTool({
        name: 'decrypt_message',
        arguments: {
            encryptedMessage,
            encryptionKey
        }
    }) as unknown as { structuredContent: {
        decryptedMessage: string
    }}

    return result
}


describe('MCP Tool Tests', () => {
    let client: Client
    let encryptionKey = 'my-super-passphrase'

    before(async ()=> {
        client = await createTestClient()
    })

    it.todo('should encryot a message', async () => {
        const message = 'Hello world'
        const result = await encryptMessage(
            client,
            message,
            encryptionKey
        )

        assert.ok(
            result.structuredContent.encryptedMessage.length > 60,
            'Encrypted message should not be empty'
        )
    })
    it.todo('should dencrypet a message', async () => {
        const message = 'Heyyyyyy'
        const key = 'super-key'

        const {structuredContent: {encryptedMessage}}  = await encryptMessage(
            client,
            message,
            key
        )

        const result  = await decryptMessage(client, encryptedMessage, key)
        assert.deepStrictEqual(
            result.structuredContent.decryptedMessage,
            message,
            'Decrypted message should match original'
        )
    })

    
    after(async () => {
        await client.close()
    })
})