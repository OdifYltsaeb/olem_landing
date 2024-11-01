import Airtable from 'airtable';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
    const formData = await req.json();

    if (!formData) {
        return NextResponse.json({ error: 'Missing form data' }, { status: 400 });
    }

    const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(process.env.AIRTABLE_BASE_ID);

    try {
        const table = process.env.AIRTABLE_TABLE_ID; // specify the table name in your .env
        const createdRecord = await base(table).create([
            {
                fields: formData, // Form fields map directly to Airtable fields
            },
        ]);

        return NextResponse.json({ success: true, record: createdRecord });
    } catch (error) {
        console.error('Error creating record in Airtable:', error);
        return NextResponse.json({ error: 'Failed to create record in Airtable' }, { status: 500 });
    }
};
