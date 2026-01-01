#!/usr/bin/env python3
"""
Script to populate Chronicles, Ezra, Nehemiah, and Esther with content
"""
import re

# Characters for remaining books
BOOK_CHARACTERS = {
    '1chronicles': [
        {
            'name': 'David',
            'date': 'c. 1010-970 BC',
            'scripture': '1 Chronicles 11:1-29:30',
            'intro': 'David as king, focusing on his preparations for the temple and his organization of worship. Chronicles presents David in a more positive light, emphasizing his faithfulness.',
            'tagline': 'King and temple preparer',
            'summary': 'In 1 Chronicles, David is presented as the ideal king who prepares for the temple and organizes worship. The book focuses on David\'s positive aspects: his victories, his bringing the ark to Jerusalem, his preparations for the temple, and his organization of the priests and Levites. David\'s role in preparing for the temple points forward to how Christ prepares the way for the true temple—the church. David\'s organization of worship points forward to how Christ establishes true worship in spirit and truth.'
        },
        {
            'name': 'Solomon',
            'date': 'c. 970-930 BC',
            'scripture': '1 Chronicles 22:1-2 Chronicles 9:31',
            'intro': 'David\'s son who builds the temple. Chronicles emphasizes his wisdom and the temple\'s construction.',
            'tagline': 'Temple builder, wise king',
            'summary': 'Solomon builds the temple that his father David prepared for. Chronicles emphasizes the temple\'s construction and Solomon\'s wisdom. The temple points forward to Christ, who is the true temple and who builds the church.'
        },
        {
            'name': 'The Lord (YHWH)',
            'date': 'Eternal',
            'scripture': '1 Chronicles 1:1-29:30 (throughout)',
            'intro': 'The God who establishes the Davidic covenant and desires true worship. His faithfulness to His promises points forward to Christ.',
            'tagline': 'The covenant-keeping God, worthy of worship',
            'summary': 'Throughout 1 Chronicles, the Lord demonstrates His faithfulness to the Davidic covenant and His desire for true worship. He establishes David as king and promises an eternal kingdom. He accepts the temple as a place of worship. The Lord\'s faithfulness points forward to how He fulfills all His promises in Christ, the true Son of David and the true temple.'
        }
    ],
    '2chronicles': [
        {
            'name': 'Solomon',
            'date': 'c. 970-930 BC',
            'scripture': '2 Chronicles 1:1-9:31',
            'intro': 'The king who builds and dedicates the temple. Chronicles emphasizes the temple\'s importance and Solomon\'s wisdom.',
            'tagline': 'Temple builder and dedicator',
            'summary': 'Solomon builds the temple and dedicates it with a great ceremony. The glory of the Lord fills the temple, and God appears to Solomon, promising to hear the prayers of His people. However, Solomon\'s later idolatry is also recorded. The temple points forward to Christ, who is the true temple and who makes true worship possible.'
        },
        {
            'name': 'Hezekiah',
            'date': 'c. 715-686 BC',
            'scripture': '2 Chronicles 29:1-32:33',
            'intro': 'A godly king who restores temple worship and trusts in the Lord. His faithfulness demonstrates the blessing of obedience.',
            'tagline': 'Reforming king, restorer of worship',
            'summary': 'Hezekiah restores the temple and leads a great reformation. He removes idols, restores temple worship, and celebrates the Passover. When the Assyrians threaten, he trusts in the Lord and sees God deliver Jerusalem. Hezekiah\'s faithfulness points forward to how we should trust in Christ and worship Him in spirit and truth.'
        },
        {
            'name': 'Josiah',
            'date': 'c. 640-609 BC',
            'scripture': '2 Chronicles 34:1-35:27',
            'intro': 'A godly king who discovers the Book of the Law and leads a great reformation. His story demonstrates the power of God\'s Word.',
            'tagline': 'Reforming king, rediscovered the Law',
            'summary': 'Josiah leads a great reformation after the Book of the Law is discovered. He removes all idols, restores temple worship, and celebrates the Passover. His faithfulness demonstrates the power of God\'s Word to bring revival. This points forward to how Christ, the Word made flesh, brings ultimate revival.'
        },
        {
            'name': 'The Lord (YHWH)',
            'date': 'Eternal',
            'scripture': '2 Chronicles 1:1-36:23 (throughout)',
            'intro': 'The God who judges unfaithful kings but also shows mercy. His judgment and mercy point forward to the cross.',
            'tagline': 'The judge and redeemer',
            'summary': 'Throughout 2 Chronicles, the Lord demonstrates both judgment and mercy. He judges unfaithful kings but shows mercy to those who repent. He allows the temple to be destroyed and the people to go into exile, but also promises future restoration. The Lord\'s work points forward to how He judges sin at the cross but also provides redemption through Christ.'
        }
    ],
    'ezra': [
        {
            'name': 'Ezra',
            'date': 'c. 458 BC',
            'scripture': 'Ezra 7:1-10:44',
            'intro': 'A priest and scribe who leads the second wave of exiles back to Jerusalem and teaches the people the Law. His ministry points forward to Christ, the ultimate Teacher.',
            'tagline': 'Priest, scribe, teacher of the Law',
            'summary': 'Ezra is a priest and scribe who is skilled in the Law of Moses. He leads a group of exiles back to Jerusalem and teaches the people the Law. When he discovers that the people have intermarried with foreign nations, he leads them in repentance. Ezra\'s teaching of the Law points forward to how Christ teaches us the true meaning of the Law and fulfills it perfectly.'
        },
        {
            'name': 'Zerubbabel',
            'date': 'c. 538 BC',
            'scripture': 'Ezra 1:1-6:22',
            'intro': 'A descendant of David who leads the first wave of exiles back to Jerusalem and begins rebuilding the temple. He points forward to Christ, the true Son of David.',
            'tagline': 'Leader of the return, temple rebuilder',
            'summary': 'Zerubbabel is a descendant of David who leads the first wave of exiles back to Jerusalem. He begins rebuilding the temple, but the work is interrupted by opposition. However, with the encouragement of the prophets Haggai and Zechariah, the temple is completed. Zerubbabel\'s role in rebuilding the temple points forward to how Christ builds the true temple—the church.'
        },
        {
            'name': 'The Lord (YHWH)',
            'date': 'Eternal',
            'scripture': 'Ezra 1:1-10:44 (throughout)',
            'intro': 'The God who restores His people from exile and enables them to rebuild the temple. His restoration points forward to Christ\'s work of redemption.',
            'tagline': 'The restorer and redeemer',
            'summary': 'Throughout Ezra, the Lord demonstrates His faithfulness in restoring His people from exile. He moves the heart of the Persian king to allow the exiles to return. He enables them to rebuild the temple despite opposition. The Lord\'s restoration of His people points forward to how Christ restores us from the exile of sin and enables us to be part of God\'s kingdom.'
        }
    ],
    'nehemiah': [
        {
            'name': 'Nehemiah',
            'date': 'c. 445 BC',
            'scripture': 'Nehemiah 1:1-13:31',
            'intro': 'A cupbearer to the Persian king who becomes governor of Judah and leads the rebuilding of Jerusalem\'s walls. His leadership points forward to Christ, the ultimate Leader.',
            'tagline': 'Wall rebuilder, faithful leader',
            'summary': 'Nehemiah is a cupbearer to King Artaxerxes who hears that Jerusalem\'s walls are broken down. He prays and fasts, then asks the king for permission to go to Jerusalem to rebuild the walls. Despite opposition, Nehemiah leads the people in rebuilding the walls in just 52 days. He also leads a spiritual reformation, having Ezra read the Law to the people. Nehemiah\'s leadership points forward to how Christ leads us in building the kingdom of God and in spiritual renewal.'
        },
        {
            'name': 'Ezra',
            'date': 'c. 445 BC',
            'scripture': 'Nehemiah 8:1-18',
            'intro': 'The priest who reads the Law to the people, leading to repentance and renewal. His teaching points forward to Christ, the ultimate Teacher.',
            'tagline': 'Teacher of the Law, bringer of renewal',
            'summary': 'Ezra reads the Book of the Law to all the people, and they respond with repentance and celebration. This leads to a great spiritual renewal. Ezra\'s teaching points forward to how Christ teaches us and brings spiritual renewal through His Word and Spirit.'
        },
        {
            'name': 'The Lord (YHWH)',
            'date': 'Eternal',
            'scripture': 'Nehemiah 1:1-13:31 (throughout)',
            'intro': 'The God who enables the rebuilding of Jerusalem and brings spiritual renewal. His work points forward to Christ\'s work of building the kingdom.',
            'tagline': 'The builder and renewer',
            'summary': 'Throughout Nehemiah, the Lord demonstrates His power in enabling the rebuilding of Jerusalem\'s walls and bringing spiritual renewal. He answers Nehemiah\'s prayers and protects the people from their enemies. The Lord\'s work points forward to how Christ builds the kingdom of God and brings spiritual renewal to all who believe.'
        }
    ],
    'esther': [
        {
            'name': 'Esther',
            'date': 'c. 478 BC',
            'scripture': 'Esther 1:1-10:3',
            'intro': 'A Jewish queen who risks her life to save her people from destruction. Her courage and faithfulness point forward to Christ, who saves His people.',
            'tagline': 'Queen and deliverer, risked all to save',
            'summary': 'Esther is a Jewish orphan who becomes queen of Persia. When a plot to destroy all the Jews is discovered, Esther\'s cousin Mordecai urges her to intercede with the king. Esther risks her life by approaching the king without being summoned, but the king receives her. She exposes the plot and saves her people. Esther\'s courage and willingness to risk everything to save her people points forward to how Christ risked everything and gave His life to save His people from sin and death.'
        },
        {
            'name': 'Mordecai',
            'date': 'c. 478 BC',
            'scripture': 'Esther 2:5-10:3',
            'intro': 'Esther\'s cousin who raises her and helps save the Jewish people. His faithfulness points forward to how we should be faithful in our roles.',
            'tagline': 'Faithful guardian, wise counselor',
            'summary': 'Mordecai is Esther\'s cousin who raises her after her parents die. He serves in the king\'s court and discovers a plot to kill the king, which is recorded in the chronicles. When the plot to destroy the Jews is discovered, Mordecai urges Esther to intercede. He also leads the Jews in defending themselves when the day of destruction comes. Mordecai\'s faithfulness points forward to how we should be faithful in our roles and trust God to work through us.'
        },
        {
            'name': 'The Lord (YHWH)',
            'date': 'Eternal',
            'scripture': 'Esther (throughout, though not mentioned by name)',
            'intro': 'The unseen but ever-present God who works providentially to save His people. His providence points forward to how He works through Christ to save us.',
            'tagline': 'The providential deliverer',
            'summary': 'Although God is never mentioned by name in Esther, His providence is evident throughout. He places Esther in the right position at the right time. He causes the king to have a sleepless night and read about Mordecai\'s service. He enables Esther to find favor with the king. The Lord\'s providential work in Esther points forward to how He works providentially through Christ to save His people from sin and death.'
        }
    ]
}

# Events for remaining books
BOOK_EVENTS = {
    '1chronicles': [
        {
            'name': 'David Brings the Ark to Jerusalem',
            'date': 'c. 1000 BC',
            'scripture': '1 Chronicles 13:1-16:43',
            'intro': 'David brings the ark of the covenant to Jerusalem, establishing it as the center of worship. This points forward to how Christ brings us into God\'s presence.',
            'tagline': 'The ark comes to Jerusalem',
            'summary': 'David decides to bring the ark of the covenant to Jerusalem. On the first attempt, Uzzah touches the ark and dies because they did not follow God\'s instructions. David learns the importance of following God\'s ways. On the second attempt, they follow the proper procedures, and the ark is brought to Jerusalem with great celebration. David organizes worship and appoints Levites to minister before the ark. The ark\'s coming to Jerusalem points forward to how Christ brings us into God\'s presence and establishes true worship.',
            'christConnection': 'The ark coming to Jerusalem points forward to how Christ brings us into God\'s presence. Just as the ark represented God\'s presence, Christ is the true presence of God among us. Through Christ, we can come into God\'s presence with confidence (<a href="https://www.biblegateway.com/passage/?search=Hebrews%204%3A16&version=NKJV" target="_blank" rel="noopener noreferrer" class="scripture-link">Hebrews 4:16</a>).'
        },
        {
            'name': 'David Prepares for the Temple',
            'date': 'c. 970 BC',
            'scripture': '1 Chronicles 22:1-29:30',
            'intro': 'David makes extensive preparations for the temple that his son Solomon will build. This points forward to how God prepares the way for Christ and the church.',
            'tagline': 'Preparations for God\'s house',
            'summary': 'Although David is not allowed to build the temple because he is a man of war, he makes extensive preparations. He gathers materials, organizes the priests and Levites, and gives detailed instructions to Solomon. David\'s heart is set on building a house for the Lord. His preparations point forward to how God prepared the way for Christ and how Christ builds the true temple—the church.',
            'christConnection': 'David\'s preparations for the temple point forward to how God prepared the way for Christ. Just as David prepared for the physical temple, God prepared for the coming of Christ, the true temple. Christ now builds the church, the true house of God (<a href="https://www.biblegateway.com/passage/?search=Ephesians%202%3A19-22&version=NKJV" target="_blank" rel="noopener noreferrer" class="scripture-link">Ephesians 2:19-22</a>).'
        }
    ],
    '2chronicles': [
        {
            'name': 'Solomon Dedicates the Temple',
            'date': 'c. 959 BC',
            'scripture': '2 Chronicles 5:1-7:22',
            'intro': 'Solomon dedicates the completed temple, and the glory of the Lord fills it. This points forward to how God\'s glory is revealed in Christ.',
            'tagline': 'The temple dedicated, God\'s glory fills it',
            'summary': 'When the temple is completed, Solomon brings the ark into the Most Holy Place. As the priests withdraw, the glory of the Lord fills the temple so that the priests cannot perform their service. Solomon then prays a dedicatory prayer, asking God to hear the prayers of His people. God appears to Solomon and promises to hear their prayers and to establish his kingdom if he remains faithful. The temple\'s dedication points forward to how God\'s glory is fully revealed in Christ, and how through Christ, we can approach God in prayer.',
            'christConnection': 'The temple dedication points forward to how God\'s glory is fully revealed in Christ. Just as God\'s glory filled the temple, God\'s glory is fully revealed in Christ (<a href="https://www.biblegateway.com/passage/?search=John%201%3A14&version=NKJV" target="_blank" rel="noopener noreferrer" class="scripture-link">John 1:14</a>). Through Christ, we can approach God with confidence.'
        },
        {
            'name': 'The Temple is Destroyed',
            'date': '586 BC',
            'scripture': '2 Chronicles 36:15-21',
            'intro': 'The Babylonians destroy the temple and take the people into exile. This marks the end of the kingdom but points forward to the true temple in Christ.',
            'tagline': 'Judgment and exile, but hope remains',
            'summary': 'Despite repeated warnings from the prophets, the people continue in their unfaithfulness. The Lord sends the Babylonians, who destroy the temple, burn the palace, and break down the walls of Jerusalem. The people are taken into exile. However, the book ends with a note of hope: Cyrus, king of Persia, issues a decree allowing the exiles to return. The temple\'s destruction points forward to how the old system of worship passes away, but the true temple—Christ and the church—is established.',
            'christConnection': 'The temple\'s destruction points forward to how the old system passes away, but the true temple—Christ—is established. Just as the physical temple was destroyed, the old covenant passes away, but Christ establishes the new covenant and the true temple—the church (<a href="https://www.biblegateway.com/passage/?search=Hebrews%208%3A13&version=NKJV" target="_blank" rel="noopener noreferrer" class="scripture-link">Hebrews 8:13</a>).'
        }
    ],
    'ezra': [
        {
            'name': 'The Return from Exile',
            'date': '538 BC',
            'scripture': 'Ezra 1:1-2:70',
            'intro': 'The first wave of exiles returns to Jerusalem under Zerubbabel\'s leadership. This restoration points forward to how Christ restores us from the exile of sin.',
            'tagline': 'Restoration begins, exiles return',
            'summary': 'In fulfillment of Jeremiah\'s prophecy, King Cyrus of Persia issues a decree allowing the Jewish exiles to return to Jerusalem to rebuild the temple. Zerubbabel leads a group of exiles back to Jerusalem. They begin rebuilding the temple, but face opposition from their enemies. However, with the encouragement of the prophets Haggai and Zechariah, the work continues. The return from exile points forward to how Christ restores us from the exile of sin and enables us to be part of God\'s kingdom.',
            'christConnection': 'The return from exile points forward to how Christ restores us from the exile of sin. Just as the exiles returned to Jerusalem, we are restored to God through Christ and become part of His kingdom (<a href="https://www.biblegateway.com/passage/?search=Colossians%201%3A13-14&version=NKJV" target="_blank" rel="noopener noreferrer" class="scripture-link">Colossians 1:13-14</a>).'
        },
        {
            'name': 'The Temple is Rebuilt',
            'date': '516 BC',
            'scripture': 'Ezra 3:1-6:22',
            'intro': 'The temple is rebuilt despite opposition. This points forward to how Christ builds the true temple—the church—despite opposition.',
            'tagline': 'The temple rebuilt, worship restored',
            'summary': 'Despite opposition from their enemies, the exiles continue rebuilding the temple. When the work is questioned by the Persian officials, they appeal to King Darius, who confirms Cyrus\'s original decree. The temple is completed and dedicated with great celebration. The rebuilding of the temple points forward to how Christ builds the true temple—the church—and how true worship is restored through Him.',
            'christConnection': 'The temple\'s rebuilding points forward to how Christ builds the true temple—the church. Just as the physical temple was rebuilt, Christ builds the spiritual temple—the church—and restores true worship (<a href="https://www.biblegateway.com/passage/?search=1%20Peter%202%3A5&version=NKJV" target="_blank" rel="noopener noreferrer" class="scripture-link">1 Peter 2:5</a>).'
        }
    ],
    'nehemiah': [
        {
            'name': 'The Walls are Rebuilt',
            'date': '445 BC',
            'scripture': 'Nehemiah 2:1-6:19',
            'intro': 'Nehemiah leads the people in rebuilding Jerusalem\'s walls in just 52 days, despite opposition. This points forward to how Christ builds the kingdom despite opposition.',
            'tagline': 'Walls rebuilt in 52 days',
            'summary': 'Nehemiah receives permission from King Artaxerxes to go to Jerusalem and rebuild the walls. Despite opposition from Sanballat, Tobiah, and others, Nehemiah leads the people in rebuilding the walls. Each family is assigned a section of the wall to rebuild. The work is completed in just 52 days, demonstrating God\'s power and the people\'s unity. The rebuilding of the walls points forward to how Christ builds the kingdom of God despite opposition and how we are called to work together in building His kingdom.',
            'christConnection': 'The rebuilding of the walls points forward to how Christ builds the kingdom of God. Just as the walls were rebuilt despite opposition, Christ builds His kingdom despite all opposition. We are called to participate in building His kingdom (<a href="https://www.biblegateway.com/passage/?search=Matthew%2016%3A18&version=NKJV" target="_blank" rel="noopener noreferrer" class="scripture-link">Matthew 16:18</a>).'
        },
        {
            'name': 'The Reading of the Law',
            'date': '445 BC',
            'scripture': 'Nehemiah 8:1-18',
            'intro': 'Ezra reads the Book of the Law to all the people, leading to repentance and spiritual renewal. This points forward to how Christ brings spiritual renewal through His Word.',
            'tagline': 'Spiritual renewal through God\'s Word',
            'summary': 'Ezra reads the Book of the Law to all the people from daybreak until noon. As he reads, the people listen attentively and respond with repentance and celebration. They celebrate the Feast of Tabernacles for the first time in many years. This leads to a great spiritual renewal. The reading of the Law points forward to how Christ brings spiritual renewal through His Word and how we should respond to God\'s Word with repentance and faith.',
            'christConnection': 'The reading of the Law points forward to how Christ brings spiritual renewal through His Word. Just as the people were renewed by hearing the Law, we are renewed by hearing and responding to Christ, the Word made flesh (<a href="https://www.biblegateway.com/passage/?search=John%201%3A1&version=NKJV" target="_blank" rel="noopener noreferrer" class="scripture-link">John 1:1</a>).'
        }
    ],
    'esther': [
        {
            'name': 'Esther Saves Her People',
            'date': '474 BC',
            'scripture': 'Esther 4:1-9:32',
            'intro': 'Esther risks her life to approach the king and save her people from destruction. Her courage points forward to how Christ saves His people.',
            'tagline': 'Courage in the face of danger, salvation for the people',
            'summary': 'When Mordecai learns of Haman\'s plot to destroy all the Jews, he urges Esther to intercede with the king. Esther knows that approaching the king without being summoned could mean death, but she decides to risk her life, saying, "If I perish, I perish." She approaches the king, who receives her. She then exposes Haman\'s plot and saves her people. The Jews are allowed to defend themselves, and they are victorious. Esther\'s courage and willingness to risk everything to save her people points forward to how Christ risked everything and gave His life to save His people from sin and death.',
            'christConnection': 'Esther\'s courage in saving her people points forward to how Christ saves His people. Just as Esther risked her life to save the Jews, Christ gave His life to save all who believe. Esther\'s story demonstrates God\'s providential care, which is fully revealed in Christ\'s work of salvation (<a href="https://www.biblegateway.com/passage/?search=Romans%205%3A8&version=NKJV" target="_blank" rel="noopener noreferrer" class="scripture-link">Romans 5:8</a>).'
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

# Update all remaining books
for book_key in ['1chronicles', '2chronicles', 'ezra', 'nehemiah', 'esther']:
    if book_key in BOOK_CHARACTERS and book_key in BOOK_EVENTS:
        update_book_content(book_key, BOOK_CHARACTERS[book_key], BOOK_EVENTS[book_key])

print('Done updating all remaining books')

