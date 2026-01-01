#!/usr/bin/env python3
"""
Script to populate remaining historical books with appropriate content
"""
import re

# Define characters for each remaining book
BOOK_CHARACTERS = {
    '1kings': [
        {
            'name': 'Solomon',
            'date': 'c. 970-930 BC',
            'scripture': '1 Kings 1:1-11:43',
            'intro': 'David\'s son who becomes king and builds the temple. Known for his wisdom, wealth, and power, but his many wives lead him into idolatry, demonstrating that even wisdom cannot save without faithfulness.',
            'tagline': 'Wise king, builder of the temple, compromised by idolatry',
            'summary': 'Solomon is David\'s son who becomes king after his father\'s death. God appears to him in a dream and offers him anything he wants. Solomon asks for wisdom to govern God\'s people, and God is pleased, giving him not only wisdom but also wealth and honor. Solomon builds the magnificent temple in Jerusalem, fulfilling his father\'s dream. However, Solomon marries many foreign wives who lead him into idolatry. Despite his wisdom, Solomon\'s heart turns away from God. His story demonstrates that wisdom alone cannot save—we need faithfulness. Solomon points forward to Christ, who is not only wise but also perfectly faithful, and who builds the true temple—the church—through His death and resurrection.'
        },
        {
            'name': 'Elijah',
            'date': 'c. 870-850 BC',
            'scripture': '1 Kings 17:1-2 Kings 2:11',
            'intro': 'A powerful prophet who confronts King Ahab and the prophets of Baal. His ministry demonstrates God\'s power over false gods and points forward to Christ, the ultimate Prophet.',
            'tagline': 'Prophet of fire, defender of the true God',
            'summary': 'Elijah is a prophet during the reign of Ahab, one of Israel\'s most wicked kings. When Ahab and his wife Jezebel lead Israel into Baal worship, Elijah confronts them. He declares a drought that lasts three years. On Mount Carmel, Elijah challenges the prophets of Baal to a contest: the god who answers with fire is the true God. Baal fails, but when Elijah prays, fire falls from heaven, consuming his sacrifice. The people declare, "The Lord—he is God!" However, when Jezebel threatens to kill him, Elijah flees in fear. God meets him at Mount Horeb, not in the wind, earthquake, or fire, but in a gentle whisper. Elijah\'s ministry demonstrates God\'s power and points forward to Christ, who is the ultimate Prophet and who demonstrates God\'s power through His miracles and ultimately through His resurrection.'
        },
        {
            'name': 'Ahab',
            'date': 'c. 874-853 BC',
            'scripture': '1 Kings 16:29-22:40',
            'intro': 'One of Israel\'s most wicked kings, who marries Jezebel and leads Israel into Baal worship. His story demonstrates the consequences of idolatry and unfaithfulness.',
            'tagline': 'Wicked king, led Israel into idolatry',
            'summary': 'Ahab becomes king of Israel and does more evil than any king before him. He marries Jezebel, a Phoenician princess who promotes Baal worship. Ahab builds a temple for Baal and sets up an Asherah pole. He is confronted by the prophet Elijah, who demonstrates that the Lord is the true God. Despite this, Ahab continues in his wickedness. He covets Naboth\'s vineyard and, with Jezebel\'s help, has Naboth killed to take it. The prophet Elijah pronounces judgment on Ahab and Jezebel. Ahab\'s story demonstrates the consequences of idolatry and the importance of faithfulness to God. It points forward to how we need a king who is perfectly faithful—Christ, who never compromised with sin or idolatry.'
        },
        {
            'name': 'The Lord (YHWH)',
            'date': 'Eternal',
            'scripture': '1 Kings 1:1-22:53 (throughout)',
            'intro': 'The sovereign God who judges unfaithful kings and demonstrates His power through His prophets. He remains faithful to His covenant despite Israel\'s unfaithfulness.',
            'tagline': 'The true King, judge of all, faithful to His covenant',
            'summary': 'Throughout 1 Kings, the Lord demonstrates His sovereignty and faithfulness. He establishes Solomon as king and allows him to build the temple. However, when Solomon and subsequent kings turn to idolatry, the Lord judges them. He raises up prophets like Elijah to confront the wicked kings and call the people back to Himself. The Lord\'s judgment on unfaithful kings points forward to how He will judge all unfaithfulness. Yet His faithfulness in maintaining the Davidic line despite the failures of individual kings points forward to how He will ultimately establish the perfect King, Christ, who is perfectly faithful and who fulfills all the promises of the Davidic covenant.'
        }
    ],
    '2kings': [
        {
            'name': 'Elisha',
            'date': 'c. 850-800 BC',
            'scripture': '2 Kings 2:1-13:21',
            'intro': 'Elijah\'s successor who performs many miracles, demonstrating God\'s power and compassion. His ministry points forward to Christ\'s miracles and ministry.',
            'tagline': 'Prophet of miracles, successor to Elijah',
            'summary': 'Elisha is Elijah\'s disciple and successor. When Elijah is taken up to heaven in a whirlwind, Elisha receives a double portion of his spirit. Elisha performs many miracles: he heals the waters of Jericho, multiplies a widow\'s oil, raises a dead boy to life, heals Naaman of leprosy, and makes an ax head float. His miracles demonstrate God\'s power and compassion. Elisha\'s ministry points forward to Christ, who performs even greater miracles and who demonstrates God\'s power and compassion in an ultimate way. Elisha\'s miracles foreshadow Christ\'s miracles, and his ministry points to how Christ ministers to the needs of His people.'
        },
        {
            'name': 'Hezekiah',
            'date': 'c. 715-686 BC',
            'scripture': '2 Kings 18:1-20:21',
            'intro': 'A godly king of Judah who trusts in the Lord and sees God deliver Jerusalem from the Assyrians. His faithfulness demonstrates the blessing of trusting in God.',
            'tagline': 'Godly king, trusted in the Lord',
            'summary': 'Hezekiah is one of Judah\'s best kings. He removes the high places, breaks down the sacred stones, cuts down the Asherah poles, and destroys the bronze snake that Moses had made because the people were worshiping it. He trusts in the Lord and keeps His commands. When the Assyrian king Sennacherib threatens Jerusalem, Hezekiah prays to the Lord, and God delivers the city, sending an angel who kills 185,000 Assyrian soldiers. When Hezekiah becomes ill and is told he will die, he prays, and God gives him fifteen more years. Hezekiah\'s faithfulness demonstrates the blessing of trusting in God. However, he also shows pride when he shows his treasures to Babylonian envoys, leading to a prophecy of future exile. Hezekiah\'s story points forward to how we need a king who is perfectly faithful and never proud—Christ, who perfectly trusted the Father and was never proud.'
        },
        {
            'name': 'Josiah',
            'date': 'c. 640-609 BC',
            'scripture': '2 Kings 22:1-23:30',
            'intro': 'A godly king who discovers the Book of the Law and leads a great reformation. His story demonstrates the power of God\'s Word to bring revival.',
            'tagline': 'Reforming king, rediscovered the Law',
            'summary': 'Josiah becomes king at age eight and does what is right in the eyes of the Lord. When he is twenty-six, he orders the temple to be repaired. During the repairs, the high priest Hilkiah finds the Book of the Law. When it is read to Josiah, he tears his robes in repentance. He realizes how far the nation has strayed from God\'s commands. Josiah leads a great reformation: he removes all idols, destroys the high places, and celebrates the Passover for the first time in many years. However, despite Josiah\'s faithfulness, God\'s judgment on Judah is already determined because of the sins of previous kings. Josiah\'s story demonstrates the power of God\'s Word to bring revival and the importance of responding to it with repentance. It points forward to how Christ, the Word made flesh, brings ultimate revival and calls us to repentance.'
        },
        {
            'name': 'The Lord (YHWH)',
            'date': 'Eternal',
            'scripture': '2 Kings 1:1-25:30 (throughout)',
            'intro': 'The sovereign God who judges unfaithful kings and nations, but also shows mercy to those who repent. His judgment and mercy point forward to the cross.',
            'tagline': 'The judge and redeemer, faithful despite unfaithfulness',
            'summary': 'Throughout 2 Kings, the Lord demonstrates both His judgment and His mercy. He judges the northern kingdom of Israel for their idolatry, allowing them to be taken into exile by the Assyrians. He also judges the southern kingdom of Judah, allowing them to be taken into exile by the Babylonians. However, He also shows mercy to godly kings like Hezekiah and Josiah. The Lord\'s judgment on unfaithful Israel points forward to how He judges all sin. Yet His preservation of a remnant and His promise of future restoration point forward to how He provides redemption through Christ. The Lord\'s work in 2 Kings ultimately points to how He judges sin at the cross but also provides mercy and redemption through Christ.'
        }
    ]
}

# Define events for each remaining book
BOOK_EVENTS = {
    '1kings': [
        {
            'name': 'Solomon Builds the Temple',
            'date': 'c. 966 BC',
            'scripture': '1 Kings 5:1-8:66',
            'intro': 'Solomon builds the magnificent temple in Jerusalem, fulfilling his father David\'s dream. The temple points forward to Christ, who is the true temple.',
            'tagline': 'The house of God built',
            'summary': 'Solomon begins building the temple in the fourth year of his reign. He uses the finest materials: cedar from Lebanon, gold, silver, and precious stones. The temple takes seven years to build. When it is completed, the ark of the covenant is brought into the Most Holy Place, and the glory of the Lord fills the temple. Solomon dedicates the temple with a prayer, asking God to hear the prayers of His people. The temple becomes the center of Israel\'s worship. However, Solomon\'s temple is only a shadow of the true temple—Christ, who is the true dwelling place of God. The temple points forward to how Christ\'s body is the true temple, and how believers are now the temple of the Holy Spirit.',
            'christConnection': 'The temple points forward to Christ, who is the true temple and the true dwelling place of God. Just as God\'s glory filled Solomon\'s temple, God\'s glory is fully revealed in Christ. The temple also points to how believers are now the temple of the Holy Spirit (<a href="https://www.biblegateway.com/passage/?search=1%20Corinthians%203%3A16&version=NKJV" target="_blank" rel="noopener noreferrer" class="scripture-link">1 Corinthians 3:16</a>).'
        },
        {
            'name': 'Elijah and the Prophets of Baal',
            'date': 'c. 860 BC',
            'scripture': '1 Kings 18:1-46',
            'intro': 'Elijah confronts the prophets of Baal on Mount Carmel, demonstrating that the Lord is the true God. This event points forward to Christ\'s victory over all false gods.',
            'tagline': 'The true God revealed',
            'summary': 'After three years of drought, Elijah confronts King Ahab and challenges the prophets of Baal to a contest on Mount Carmel. The prophets of Baal call on their god all day, but there is no response. Then Elijah prays to the Lord, and fire falls from heaven, consuming his sacrifice, the wood, the stones, and even the water in the trench. The people fall prostrate and cry, "The Lord—he is God! The Lord—he is God!" Elijah then has the prophets of Baal killed. This event demonstrates that the Lord is the true God and that all other gods are false. It points forward to how Christ demonstrates that He is the true God through His miracles, His resurrection, and His victory over sin and death.',
            'christConnection': 'Elijah\'s victory over the prophets of Baal points forward to how Christ demonstrates that He is the true God. Just as fire fell from heaven to prove the Lord is God, Christ\'s resurrection proves that He is the true God and the only way to salvation (<a href="https://www.biblegateway.com/passage/?search=Acts%2017%3A31&version=NKJV" target="_blank" rel="noopener noreferrer" class="scripture-link">Acts 17:31</a>).'
        }
    ],
    '2kings': [
        {
            'name': 'The Fall of Samaria',
            'date': '722 BC',
            'scripture': '2 Kings 17:1-41',
            'intro': 'The northern kingdom of Israel falls to the Assyrians and is taken into exile. This demonstrates the consequences of unfaithfulness and points forward to the need for redemption.',
            'tagline': 'Judgment for unfaithfulness',
            'summary': 'After years of idolatry and unfaithfulness, the northern kingdom of Israel falls to the Assyrians. The Assyrian king Shalmaneser besieges Samaria for three years, and in the ninth year of Hoshea\'s reign, the city falls. The Israelites are taken into exile in Assyria, and foreign peoples are brought in to replace them. This marks the end of the northern kingdom. The fall of Samaria demonstrates the consequences of unfaithfulness to God. It points forward to how all people face judgment for sin, but also to how God provides redemption through Christ, who takes the judgment we deserve.',
            'christConnection': 'The fall of Samaria demonstrates the consequences of sin and the need for redemption. Just as Israel faced judgment for their unfaithfulness, we all face judgment for our sin. However, Christ took that judgment on Himself at the cross, providing redemption for all who believe (<a href="https://www.biblegateway.com/passage/?search=Romans%203%3A23-24&version=NKJV" target="_blank" rel="noopener noreferrer" class="scripture-link">Romans 3:23-24</a>).'
        },
        {
            'name': 'The Fall of Jerusalem',
            'date': '586 BC',
            'scripture': '2 Kings 25:1-30',
            'intro': 'The southern kingdom of Judah falls to the Babylonians, and the temple is destroyed. This marks the end of the kingdom period but points forward to future restoration through Christ.',
            'tagline': 'The end of the kingdom, but hope remains',
            'summary': 'After years of unfaithfulness, despite the reforms of godly kings like Hezekiah and Josiah, Judah falls to the Babylonians. King Nebuchadnezzar besieges Jerusalem, and after a long siege, the city falls. The Babylonians destroy the temple, burn the palace, and break down the walls of Jerusalem. Most of the people are taken into exile in Babylon. This marks the end of the kingdom period and the destruction of the temple. However, God promises through the prophets that there will be a future restoration. The fall of Jerusalem points forward to how Christ provides the ultimate restoration, not just for Israel but for all who believe, and how He establishes the true and eternal kingdom.',
            'christConnection': 'The fall of Jerusalem points forward to how Christ provides ultimate restoration. Just as Jerusalem fell because of sin, we all face the consequences of sin. However, Christ provides restoration through His death and resurrection, establishing the true and eternal kingdom of God (<a href="https://www.biblegateway.com/passage/?search=Revelation%2021%3A1-4&version=NKJV" target="_blank" rel="noopener noreferrer" class="scripture-link">Revelation 21:1-4</a>).'
        }
    ]
}

def update_book_content(book_key, characters, events):
    """Update a book's characters and events arrays"""
    # Update characters
    for lang in ['en', 'es']:
        suffix = '-es' if lang == 'es' else ''
        filename = f'{book_key}{suffix}.html'
        
        try:
            with open(filename, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Find and replace characters array
            start = content.find('const mainCharacters = [')
            if start == -1:
                print(f'Could not find characters array in {filename}')
                continue
            
            # Find the matching closing bracket
            bracket_count = 0
            end = start
            for i in range(start, len(content)):
                if content[i] == '[':
                    bracket_count += 1
                elif content[i] == ']':
                    bracket_count -= 1
                    if bracket_count == 0:
                        end = i + 1
                        break
            
            # Build new characters array
            new_chars = '        const mainCharacters = [\n'
            for char in characters:
                new_chars += '            {\n'
                new_chars += f'                name: "{char["name"]}",\n'
                new_chars += f'                date: "{char["date"]}",\n'
                new_chars += f'                scripture: "{char["scripture"]}",\n'
                new_chars += f'                intro: "{char["intro"]}",\n'
                new_chars += f'                tagline: "{char["tagline"]}",\n'
                new_chars += f'                summary: "{char["summary"]}"\n'
                new_chars += '            },\n'
            new_chars += '        ];'
            
            # Replace
            new_content = content[:start] + new_chars + content[end:]
            
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            print(f'Updated characters in {filename}')
        except Exception as e:
            print(f'Error updating {filename}: {e}')
        
        # Update events
        filename = f'{book_key}-events{suffix}.html'
        
        try:
            with open(filename, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Find and replace events array
            start = content.find('const mainEvents = [')
            if start == -1:
                print(f'Could not find events array in {filename}')
                continue
            
            # Find the matching closing bracket
            bracket_count = 0
            end = start
            for i in range(start, len(content)):
                if content[i] == '[':
                    bracket_count += 1
                elif content[i] == ']':
                    bracket_count -= 1
                    if bracket_count == 0:
                        end = i + 1
                        break
            
            # Build new events array
            new_events = '        const mainEvents = [\n'
            for event in events:
                new_events += '            {\n'
                new_events += f'                name: "{event["name"]}",\n'
                new_events += f'                date: "{event["date"]}",\n'
                new_events += f'                scripture: "{event["scripture"]}",\n'
                new_events += f'                intro: "{event["intro"]}",\n'
                new_events += f'                tagline: "{event["tagline"]}",\n'
                new_events += f'                summary: "{event["summary"]}",\n'
                new_events += f'                christConnection: "{event["christConnection"]}"\n'
                new_events += '            },\n'
            new_events += '        ];'
            
            # Replace
            new_content = content[:start] + new_events + content[end:]
            
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            print(f'Updated events in {filename}')
        except Exception as e:
            print(f'Error updating {filename}: {e}')

# Update 1 Kings and 2 Kings
if '1kings' in BOOK_CHARACTERS:
    update_book_content('1kings', BOOK_CHARACTERS['1kings'], BOOK_EVENTS['1kings'])

if '2kings' in BOOK_CHARACTERS:
    update_book_content('2kings', BOOK_CHARACTERS['2kings'], BOOK_EVENTS['2kings'])

print('Done updating 1 Kings and 2 Kings')

